import React from 'react';
import FroalaEditor from 'react-froala-wysiwyg';

export const Form = props => {
    return(
        <form onSubmit={props.handleSubmit}>
            <br/>
            <div className="row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label>Titel:</label>
                        <input type="text"
                            name="title"
                            className="form-control"
                            value={props.title}
                            onChange={props.handleInputChange}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label>Ny bild:</label>
                        <input type="file"
                            name="image" 
                            className="form-control"
                            onChange={props.handleInputChange}
                            accept="image/*"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <label>Nuvarande bild:</label><br />
                    {props.preview && <img src={props.preview} height="100" width="150" />}
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-md-8">
                    <div className="form-group">
                        <FroalaEditor
                            config={{height: 300}}
                            model={props.text}
                            onModelChange={props.handleTextChange}
                        />
                    </div>   
                </div>
            </div><br/>
            <div className="form-group">
                <button className="btn btn-primary">Spara</button>
            </div>
        </form>
    );
};

export default Form;