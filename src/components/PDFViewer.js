import React from "react";

import { pdfjs, Document, Page } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class PDFViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            numPages: 0
        };
    }

    onDocumentLoad = ({ numPages }) => {
        this.setState({numPages});
    }

    render() {
        var { pdf, className } = this.props;

        return (
        <Document
            className={className}
            file={pdf}
            onLoadSuccess={this.onDocumentLoad}
        >
            {Array.from(new Array(this.state.numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
        </Document>);
    }

}