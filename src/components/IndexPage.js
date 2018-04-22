import React, { Component } from 'react';
import { TableRow } from './TableRow';

export class IndexPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {articles: '', isLoading: true};
        this.tableRow = this.tableRow.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount()
    {
        fetch('/api/articles')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            this.setState({articles: data, isLoading: false});
        });
    }

    tableRow()
    {
        if(this.state.articles instanceof Array)
        {
            return this.state.articles.map((object, i) => {
                return <TableRow obj={object} key={i} handleDelete={this.handleDelete} />;
            })
        }
        
    }

    handleDelete(e)
    {
        fetch('/api/articles/' + e.target.id, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => {
            if(res.ok) return res.json();
        })
        .then((data) => {
            this.setState({articles: data});
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
                    <h1>Artiklar</h1>
                    <br/>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <td><b>ID</b></td>
                                <td><b>Titel</b></td>
                                <td><b>Senast ändrad</b></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            { this.tableRow() }
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default IndexPage;