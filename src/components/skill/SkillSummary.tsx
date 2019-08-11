import React from "react";
import { SkillProps } from "./Skill";
import { Box, Button } from "@material-ui/core";
import { removeSkill } from "../../firebase/firebase";

export const SkillSummary: React.FC<SkillProps> = (props) => {
    const { name, targetHours, achievedHours } = props.skill;
    const displayName = name[0] ? name[0].toUpperCase().concat(name.substring(1)) : name;
    const handleClickDelete = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();
        removeSkill(props.skillId);    
    } 
    return(
        <Box width="100%">
            <Box display="inline-block" width="40%" paddingRight={3}>
                {displayName}
            </Box>
            <Box display="inline-block" width="30%" paddingRight={3} fontWeight="fontWeightLight">
                {achievedHours}/{targetHours} hours achieved
            </Box>
            <Box display="inline-block" textAlign="right" width="30%" paddingRight={3}>
                <Button
                    color="secondary"
                    data-testid="submit"
                    type="submit"
                    onClick={handleClickDelete}
                >
                    Delete
                    </Button>  
            </Box>
        </Box>
    )
}