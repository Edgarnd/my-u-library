import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from "@mui/material/styles";
import propTypes from "prop-types"

const CardContentNoBottomPadding = styled(CardContent)(`
  &:last-child {
    padding-bottom: 0;
  }
`);

export default function CardCustom({ children }) {
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

CardCustom.propTypes = {
    children: propTypes.any
} 