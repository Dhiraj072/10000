import React from 'react';
import firebase from 'firebase';
import { Box, Button } from '@material-ui/core';
import { KeyValueDisplay } from '../skill/UpdateSkillForm';
import { logOut } from '../../firebase/firebase';

export const UserInfo: React.FC<{}> = () => {
    const user = firebase.auth().currentUser;
    return (
        <Box>
        {
            user === null
            ? <Box>Not signed in</Box>
            :<Box>
                <KeyValueDisplay
                    title="Name"
                    value={user.displayName == null ? '' : user.displayName}
                />
                <Box paddingTop={2}>
                    <Button onClick={logOut} variant="outlined" color="secondary">
                        Logout
                    </Button>
                </Box>
            </Box>
        }
        </Box>
    )
}