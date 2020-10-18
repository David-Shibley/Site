import React, { useEffect, useState } from 'react';
import SitesList from './SitesList';
import { Button, TextField, Box, Container, ButtonGroup } from '@material-ui/core';

const DailySites = () => {
    useEffect(() => {
        const input = document.querySelector('#AddNewTabField');
        input.addEventListener('keyup', event => {
            if (event.keyCode === 13 && input.value) {
                addTab();                    
            }
        })
    })

    const [tabs, setTabs] = useState(() => {
        const tabs = JSON.parse(localStorage.getItem('tabs'));
        return tabs ? tabs : [];
    })
    const checkedTabs = tabs.filter(tab => tab.checked);

    const hasAllCheckedTabs = () => {
        return checkedTabs.length === tabs.length
    }

    function toggleCheckAll() {
        let tabsCopy = tabs.slice();
        if (hasAllCheckedTabs()) {
            tabsCopy.map(tab => tab.checked = false)
        } else {
            tabsCopy.map(tab => tab.checked = true)
        }
        localStorage.setItem('tabs', JSON.stringify(tabsCopy))
        setTabs(tabsCopy)
    }
        
    const getInputValue = () => {
        const input = document.querySelector('#AddNewTabField');

        return input && input.value
    }

    function addTab() {
        const tab = { checked: false, value: getInputValue()}
        const storedTabs = JSON.parse(localStorage.getItem('tabs'));

        if (tab) {
            const newTabs = [tab, ...storedTabs];
        
            localStorage.setItem('tabs', JSON.stringify(newTabs));
            setTabs(newTabs);
            const input = document.querySelector('#AddNewTabField');
            input ? input.value = "" : input.value = null;
        }
    }

    function onRemoveClick(tab) {
        if (tab) {
            let tabsCopy = tabs.slice()
            tabsCopy.splice(tabs.indexOf(tab), 1);
            localStorage.setItem('tabs', JSON.stringify(tabsCopy));
            setTabs(tabsCopy)
        }
    }

    function loadSites()  {
        return checkedTabs && checkedTabs.forEach(tab => window.open(tab.value))
    }

    function deleteSelected() {
        const newTabs = tabs.filter(tab => !tab.checked)
        localStorage.setItem('tabs', JSON.stringify(newTabs));
        setTabs(newTabs)
    }

    const toggleAllButtonTitle = hasAllCheckedTabs() ? 'Uncheck all' : 'Check all'
    const checkedItems = tabs.length && tabs.filter(tab => tab.checked)

    const getActionMenu = () => {
        return (
            <ButtonGroup>
                <Button onClick={loadSites}>Open Selected</Button>
                <Button onClick={deleteSelected}>Delete Selected</Button>
                <Button onClick={toggleCheckAll}>{toggleAllButtonTitle}</Button>
            </ButtonGroup>
        )
    }

    const addNewInputProps = {
        id: "AddNewTabField",
        label: "Add New",
        autoFocus: true,
    }

    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        padding: '2.4rem 0',
    }

    return (
        <Container style={{...containerStyles}}>
            {tabs.length ? getActionMenu() : null}
            <Box style={{ display: 'flex', alignItems: 'baseline'}}>
                <Button onClick={addTab}>Add</Button>
                <TextField {...addNewInputProps}></TextField>
            </Box>
            <SitesList {...{ onRemoveClick, setTabs, tabs }} />
        </Container>
    )
}

export default DailySites;