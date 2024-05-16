import Grid from "@mui/material/Grid";
import React from "react";
import { MyBook } from "../../data/model/response/MyBook.ts";
import InputTextForm from "../components/form/InputTextForm.tsx";
import InputTextAreaForm from "../components/form/InputTextAreaForm.tsx";
import InputFileForm from "../components/form/InputFileForm.tsx";

interface BookFormProps {
    book?: MyBook;
    photoNameFile?: string | undefined
}

export default function BookForm({ book = new MyBook(), photoNameFile = "Upload a photo" }: BookFormProps) {
    return (
        <Grid container columns={12} spacing={5} rowSpacing={3}>
            <Grid item xs={12} md={6}>
                <InputTextForm
                    placeholder="Title"
                    value={book.title}
                    onChange={(e) => book.title = e.target.value} />
            </Grid>
            <Grid item xs={12} md={6}>
                <InputTextForm
                    placeholder="Author"
                    value={book.author}
                    onChange={(e) => book.author = e.target.value} />
            </Grid>
            <Grid item xs={12} md={6}>
                <InputTextForm
                    placeholder="Genre"
                    value={book.genre}
                    onChange={(e) => book.genre = e.target.value} />
            </Grid>
            <Grid item xs={12} md={6}>
                <InputTextForm
                    placeholder="Revision"
                    value={book.revision}
                    onChange={(e) => book.revision = e.target.value} />
            </Grid>
            <Grid item xs={12} md={6}>
                <InputTextForm
                    placeholder="Year Published"
                    value={book.yearPub.toString()}
                    onChange={(e) => book.yearPub = Number(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
                <InputTextForm
                    placeholder="Quantity in stock"
                    value={book.quantity.toString()}
                    onChange={(e) => book.quantity = Number(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                <InputTextAreaForm
                    placeholder="Description"
                    value={book.description}
                    onChange={(e) => book.description = e.target.value} />
            </Grid>
            <Grid item xs={12}>
                <InputFileForm
                    value={photoNameFile}
                    onChange={(e) => {
                        if (e.target.files !== null && e.target.files !== undefined) {
                            let filePhoto = e.target.files[0];
                            if (filePhoto !== null && filePhoto !== undefined) {
                                let mimeType = filePhoto.type;
                                book.photoType = mimeType;

                                if (!filePhoto) {
                                    console.error('No file selected');
                                    return;
                                }

                                const reader = new FileReader();

                                reader.onload = function (e) {
                                    const base64String = e.target?.result;
                                    book.photo = base64String?.toString() ?? "";
                                    if(book.photo.includes(",")){
                                        book.photo = book.photo.split(",")[1];
                                    }
                                };

                                reader.onerror = function (error) {
                                    console.error('Couldnt read the file', error);
                                };

                                reader.readAsDataURL(filePhoto);
                            }
                        }
                    }} />
            </Grid>
        </Grid>
    )
}

