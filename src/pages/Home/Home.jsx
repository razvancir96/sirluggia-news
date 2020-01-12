import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { getNews } from '../../redux/news/newsActions';

function Home(props) {

    const page = 1;
    const {getNews, newsList} = props;

    useEffect(() => {
        getNews({page});
    }, [page, getNews]);

    return (
        <Layout>
            <div>
                <h1>HOME</h1>
                { newsList
                    && newsList.map(news => (
                        <div key={news.id}>
                            <h2>{news.pillarName} - {news.sectionName}</h2>
                            <h3>{news.webTitle}</h3>
                        </div>
                    ))
                }
            </div>
        </Layout>
    )
}

function mapStateToProps(state) {
    return {
        newsList: state.news.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getNews: (payload) => dispatch(getNews(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
