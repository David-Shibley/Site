import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SitesList(props) {
  const classes = useStyles();

  const tabs = props.tabs.slice();

  const handleToggle = (value) => () => {
    const currentTab = tabs.filter(tab => tab.value === value)[0];
    currentTab.checked = !currentTab.checked

    localStorage.setItem('tabs', JSON.stringify(tabs))
    props.setTabs(tabs);
  };

  return (
    <List className={classes.root}>
      {tabs.map((tab) => {
        const value = tab.value;
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={tab.checked}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value} />
            <ListItemSecondaryAction>
              <Tooltip title="Delete">
                <IconButton aria-label="delete" edge="end" onClick={() => {props.onRemoveClick(tab)}}>
                  <DeleteIcon/>
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
