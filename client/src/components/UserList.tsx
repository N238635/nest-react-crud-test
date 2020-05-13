import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { User } from './User';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: 400,
            maxWidth: 300,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export default function UserList(props: any) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.users.map((user: any) => (
                <ListItem button>
                    <User user={user} />
                    {/* <ListItemText primary={`User ${user.name}`} /> */}
                </ListItem>
            ))}
        </div>
    );
}