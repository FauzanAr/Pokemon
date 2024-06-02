import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, Grid, Image, Container, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchHomeData, setHomeQuery } from '../redux/home/action';
import { fetchMyPokemon } from '../redux/myPokemon/action';

function Home() {
    const dispatch = useDispatch();
    const { query, data, loading, error } = useSelector((state) => state.home);

    const [limit, setLimit] = useState(query.limit);
    const [offset, setOffset] = useState(query.offset);

    useEffect(() => {
        dispatch(fetchHomeData());
        dispatch(fetchMyPokemon());
    }, []);

    const handleLimitChange = (event) => {
        const newLimit = parseInt(event.target.value);
        setLimit(newLimit);
        dispatch(setHomeQuery({ limit: newLimit, offset }));
    };

    const handleOffsetChange = (event) => {
        const newOffset = parseInt(event.target.value);
        setOffset(newOffset);
        dispatch(setHomeQuery({ limit, offset: newOffset }));
    };


    return (
        <div>
            {/* <div>
                <label>Limit: </label>
                <input type="number" value={limit} onChange={handleLimitChange} />
            </div>
            <div>
                <label>Offset: </label>
                <input type="number" value={offset} onChange={handleOffsetChange} />
            </div> */}

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && data && data?.data && data?.data?.results && data?.data?.results?.length > 0 && (
                <Container>
                    <Segment>
                        <Grid.Row centered>
                            <Card.Group centered>
                                {data.data.results.map((item) => (
                                    <Link to={`/detail/${item.id}`}>
                                        <Card key={item.id}>
                                            <Image src={item.images} wrapped ui={false} />
                                            <CardContent>
                                                <CardHeader>{item.name}</CardHeader>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </Card.Group>
                        </Grid.Row>
                    </Segment>
                </Container>
            )}
        </div>
    );
}

export default Home;