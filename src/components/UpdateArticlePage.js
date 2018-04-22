import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from './Form';

export class UpdateArticlePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {title: '', preview: '', text: '', isSuccess: false, image: '', isLoading: true};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        fetch('/api/articles/' + this.props.match.params.id)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            this.setState({
                title: data[0].title,
                image: data[0].image,
                text: data[0].text,
                preview: '/api/image/' + data[0].image,
                isLoading: false
            });
        });
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

        this.setState({[name]: value});
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

        fetch('/api/articles/' + this.props.match.params.id, {
            method: 'put',
            body: formData
        })
        .then((res) => {
            if(res.ok)
            {
                this.setState({isSuccess: true});
            }
            else console.log(res);
        });
    }

    render()
    {
        if(this.state.isLoading)
        {    
            return( 
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        }
        else
        {
            return(
                <div>
                    <h1>Uppdatera artikel</h1>
                    <br/>
                    <Link to="/" className="btn btn-info">Tillbaka</Link>
                    <br/>
                    {this.state.isSuccess &&
                        <div className="alert alert-success">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>Success!</strong> Artikeln uppdaterades.
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
    }
};

export default UpdateArticlePage;