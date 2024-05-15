import React from "react";
import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import useThemeCustom from "../../../domain/hook/useThemeCustom.tsx";
import ButtonSecondaryIcon from "../form/ButtonSecondaryIcon.tsx";
import InputTextForm from "../form/InputTextForm.tsx";

createTheme("darkMode", {
    text: {
        primary: "white",
        secondary: "white",
        disabled: "white",
    },
    background: {
        default: "#1E1E1E",
    },
    context: {
        background: "#cb4b16",
        text: "#FFFFFF",
    },
    divider: {
        default: "GrayText",
    },
    button: {
        default: "#FFFFFF",
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
    },
    action: {
        default: "#FFFFFF",
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
    },
});

type DataTableCustomProps = {
    columns: Array<any>,
    loading: boolean,
    data: Array<any>,
    label: string,
    onAdd?: Function,
}

const DataTableCustom: React.FC<DataTableCustomProps> = ({ columns, loading, data, label, onAdd }) => {
    const { isDarkMode } = useThemeCustom();
    const [dataFiltered, setDataFiltered] = useState<Array<any>>([]);

    function searchValue(objeto: any, valorBuscado: string, resultados: Array<any>) {
        for (let clave in objeto) {
            if (typeof objeto[clave] === 'object') {
                searchValue(objeto[clave], valorBuscado, resultados);
            } else {
                if (typeof objeto[clave] === 'string' && objeto[clave].toLowerCase().includes(valorBuscado.toLowerCase())) {
                    resultados.push(objeto);
                    break;
                }
            }
        }
    }

    function search(array: Array<any>, valorBuscado: string): Array<any> {
        const resultados: Array<any> = [];
        for (let objeto of array) {
            searchValue(objeto, valorBuscado.toLowerCase(), resultados);
        }
        return resultados;
    }

    useEffect(() => {
        setDataFiltered(data);
    }, [data])

    return (
        <DataTable
            title={
                <Grid container spacing={4}>
                    <Grid item xs={4} sm={8} md={10}>
                        <Typography
                            fontSize="18px"
                            fontWeight="bold">{label}</Typography>
                    </Grid>
                    <Grid item xs={8} sm={4} md={2}>
                        <div style={{ height: "38px" }}>
                            {onAdd && <ButtonSecondaryIcon
                                text="Add new"
                                onClick={() => {
                                    if (onAdd !== null && onAdd !== undefined) {
                                        onAdd();
                                    }
                                }}
                                type="button"
                                icon="add" />}
                        </div>
                    </Grid>
                </Grid>
            }
            theme={isDarkMode ? "darkMode" : undefined}
            subHeader
            subHeaderComponent={
                <div style={{ height: "38px" }}>
                    <InputTextForm
                        placeholder="Search"
                        onChange={(e) => {
                            let valSearch = e.target.value.toLowerCase();
                            let resultSearch = search(data, valSearch);
                            // data.filter(r => r.nombre.toLowerCase().includes(valSearch));
                            setDataFiltered(resultSearch);
                        }} />
                </div>
            }
            pagination
            customStyles={{
                rows: {
                    style: {
                        fontSize: "14px"
                    }
                }
            }}
            columns={columns}
            data={dataFiltered}
            noDataComponent={
                <div className="pt-4 pb-5">
                    {loading ? <Box display="flex" flexDirection="column" alignItems="center">
                        <CircularProgress thickness={5.0} />
                        <Typography>Loading</Typography>
                    </Box> :
                        <Typography>There is no information</Typography>}
                </div>
            }
            paginationComponentOptions={{
                rowsPerPageText: "Show",
                rangeSeparatorText: "of",
                selectAllRowsItem: true,
                selectAllRowsItemText: "All",
            }} />
    )
}

export default DataTableCustom