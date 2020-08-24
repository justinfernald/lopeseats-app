import React from "react";
import { Document, Page } from 'react-pdf/dist/entry.webpack';

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