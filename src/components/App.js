import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
import { IndexPage } from './IndexPage';
import { UpdateArticlePage } from './UpdateArticlePage';
import { CreateArticlePage } from './CreateArticlePage';
import { NotFoundPage } from './NotFoundPage';

export const App = () => (
    <Layout>
        <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/articles/add" component={CreateArticlePage} />
            <Route exact path="/articles/:id" component={UpdateArticlePage} />
            <Route component={NotFoundPage} />
        </Switch>
    </Layout>
);

export default App;