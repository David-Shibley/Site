import React, { useEffect, useState } from 'react';
import SitesList from './SitesList';

function clearTabs() {
    localStorage.setItem('tabs', JSON.stringify([]));
    localStorage.setItem('checkedTabs', JSON.stringify([]))
}

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

    function addTab() {
        const tab = getInputValue();
        if (tab) {
            const newTabs = [tab, ...tabs];
        
            localStorage.setItem('tabs', JSON.stringify(newTabs));
            setTabs(newTabs);
            const input = document.querySelector('input');
            input ? input.value = "" : null;
        }
    }

    function onRemoveClick(tab) {
        let tabsCopy = tabs;
        if (tab) {
            tabsCopy.splice(tabsCopy.indexOf(tab), 1);
            localStorage.setItem('tabs', JSON.stringify(tabsCopy));
            setTabs(tabsCopy)
            // window.location.reload()
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

    return (
        <div>
            <div>Daily Sites</div>
            <menu style={menuStyles}>
                <button onClick={loadSites} style={{marginBottom: "1.2rem"}}>Click to rerun scripts</button>
                <button onClick={clearTabs} style={{marginBottom: "1.2rem"}}>Clear All Tabs</button>
                <label>Add New Tab:</label>
                <input></input>
                <button onClick={addTab}>Add Tab</button>
            </menu>
            <div style={{ justifyContent: "left", display: "flex" }}>Sites to be loaded:</div>
            <SitesList {...{ onRemoveClick, tabs }} />
        </div>
    )
}

export default DailySites;