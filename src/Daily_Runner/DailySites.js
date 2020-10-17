import React, { useEffect, useState } from 'react';
import SitesList from './SitesList';

const DailySites = () => {
    useEffect(() => {
        document.querySelector('input').addEventListener('keyup', event => {
            if (event.keyCode === 13) {
                const input = document.querySelector('input');
                const tab = input && input.value;
                addTab(tab);
                input ? input.value = "" : null;
            }
        })
    })

    const [tabs, setTabs] = useState(() => {
        const tabs = JSON.parse(localStorage.getItem('tabs'));
        return tabs ? tabs : [];
    })

    const hasAllCheckedTabs = () => {
        const tabsCopy = tabs.slice();
        const numberOfCheckedTabs = tabsCopy.filter(tab => tab.checked);
        return numberOfCheckedTabs.length === tabs.length
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

    function addTab() {
        const tab = { checked: false, value: getInputValue()}
        if (tab) {
            const newTabs = [tab, ...tabs];
        
            localStorage.setItem('tabs', JSON.stringify(newTabs));
            setTabs(newTabs);
            const input = document.querySelector('input');
            input ? input.value = "" : null;
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
        if (tabs) {
            tabs.map(tab => {
                window.open(tab);
            });
        }
    }

    const menuStyles = {
        display: "flex",
        padding: 0,
        justifyContent: "space-between",
        width: "29vw",
        flexWrap: "wrap",
    }
    
    const getInputValue = () => {
        const input = document.querySelector('input');

        return input && input.value
    }

    const toggleAllButtonTitle = hasAllCheckedTabs() ? 'Uncheck all' : 'Check all'

    return (
        <div>
            <div>Daily Sites</div>
            <menu style={menuStyles}>
                <button onClick={loadSites} style={{marginBottom: "1.2rem"}}>Click to rerun scripts</button>
                <button onClick={toggleCheckAll} style={{marginBottom: "1.2rem"}}>{toggleAllButtonTitle}</button>
                <label>Add New Tab:</label>
                <input></input>
                <button onClick={addTab}>Add Tab</button>
            </menu>
            <div style={{ justifyContent: "left", display: "flex" }}>Sites to be loaded:</div>
            <SitesList {...{ onRemoveClick, setTabs, tabs }} />
        </div>
    )
}

export default DailySites;