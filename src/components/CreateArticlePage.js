import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from './Form';

export class CreateArticlePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {title: '', image: '', text: '', isSuccess: false, preview: ''};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e)
    {
        const target = e.target;
        const value = target.type === 'file' ? target.files[0] : target.value;
        const name = target.name;  
        
        if(name === 'image')
        {
            const reader = new FileReader();
            const file = value;

            reader.addEventListener('load', () => {
                this.setState({preview: reader.result});
            }, false);

            if(file) reader.readAsDataURL(file);
        }

        this.setState({ [name]: value });
    }

    handleTextChange(text)
    {
        this.setState({text: text});
    }

    handleSubmit(e)
    {
        e.preventDefault();
        let formData = new FormData();
		formData.append("title", this.state.title);
		formData.append("image", this.state.image);
        formData.append("text", this.state.text);

        fetch('/api/articles', {
            method: 'post',
            body: formData
        })
        .then((res) => {
            if(res.ok)
            {
                this.setState({
                    title: '',
                    text: '',
                    image: '',
                    preview: '',
                    isSuccess: true
                });
            }
        });
    }

    render()
    {
        return(
            <div>
                <h1>Skapa artikel</h1>
                <br/>
                <Link to="/" className="btn btn-info">Visa artiklar</Link>
                {this.state.isSuccess &&
                        <div className="alert alert-success" style={{marginTop: 20, marginBottom: 10}}>
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>Success!</strong> Artikeln sparades.
                        </div>
                }
                <Form
                    title={this.state.title}
                    text={this.state.text}
                    preview={this.state.preview}
                    handleInputChange={this.handleInputChange}
                    handleTextChange={this.handleTextChange}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }   
};

export default CreateArticlePage;