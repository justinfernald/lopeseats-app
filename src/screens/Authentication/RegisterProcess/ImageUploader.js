import React from "react";
import BlankImage from "../../../assets/images/blank.png";
import Compressor from "compressorjs";

export default class ImageUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentWillUnmount() {}

    onImageUpload = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        new Compressor(file, {
            convertSize: 10000,
            quality: 0.6,
            success: (result) => {
                var urlCreator = window.URL || window.webkitURL;
                let image = new Image();
                image.src = urlCreator.createObjectURL(result);

                let canvas = document.createElement("canvas");
                canvas.width = 256;
                canvas.height = 256;

                let ctx = canvas.getContext("2d");

                image.onload = () => {
                    var sourceX =
                        image.width > image.height
                            ? (image.width - image.height) / 2
                            : 0;
                    var sourceY =
                        image.height > image.width
                            ? (image.height - image.width) / 2
                            : 0;
                    var sourceWidth =
                        image.width > image.height ? image.height : image.width;
                    var sourceHeight = sourceWidth;
                    var destWidth = 256;
                    var destHeight = 256;
                    var destX = canvas.width / 2 - destWidth / 2;
                    var destY = canvas.height / 2 - destHeight / 2;
                    ctx.drawImage(
                        image,
                        sourceX,
                        sourceY,
                        sourceWidth,
                        sourceHeight,
                        destX,
                        destY,
                        destWidth,
                        destHeight
                    );
                    // console.log(canvas.toDataURL('image/jpeg'));
                    this.setState({ image: canvas.toDataURL("image/jpeg") });
                    if (this.props.onUpload)
                        this.props.onUpload(canvas.toDataURL("image/jpeg"));
                };
            },
            error(err) {
                // console.log(err.message);
            },
        });
    };

    render() {
        return (
            <div className="uploaderCircle flexDisplay alignCenter">
                <div className="imageWrapper">
                    <img
                        className="backgroundImg"
                        src={this.props.image || BlankImage}
                        alt=""></img>
                    {!this.props.image && <div className="crossHair"></div>}
                    {this.props.editBar ? <div className="editBar">Edit</div> : null}
                    <input
                        onChange={this.onImageUpload}
                        className="imageUpload"
                        type="file"
                        accept="image/*"
                    />
                </div>
            </div>
        );
    }
}
