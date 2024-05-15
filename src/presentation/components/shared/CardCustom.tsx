import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from "@mui/material/styles";

const CardContentNoBottomPadding = styled(CardContent)(`
  &:last-child {
    padding-bottom: 0;
  }
`);

type CardCustomProps = {
    children: React.ReactNode
}

const CardCustom: React.FC<CardCustomProps> = ({ children }) => {
    return (
        <>
            <Card>
                <CardContentNoBottomPadding>
                    {children}
                </CardContentNoBottomPadding>
            </Card>
        </>
    )
}

export default CardCustom;