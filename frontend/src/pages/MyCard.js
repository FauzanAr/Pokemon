import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardGroup, Card, CardContent, Image, Button, Container, Segment, CardHeader, CardMeta, Grid, GridRow } from 'semantic-ui-react';
import { fetchMyPokemon, releasePokemon } from "../redux/myPokemon/action";

function MyCard() {
    const dispatch = useDispatch();
    const { data, loading, error, loadingRealase } = useSelector((state) => state.myPokemon);

    useEffect(() => {
        dispatch(fetchMyPokemon());
    }, []);

    const handleRelease = (id) => {
        dispatch(releasePokemon(id))
    }

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && data?.data?.length > 0 && (
                <Container>
                    <Segment>
                        <Grid.Row centered>
                            <Card.Group centered>
                                {data.data.map((item) => (
                                    <Card key={item.id}>
                                        <CardContent>
                                            <Image floated="right" size="mini" src={item.images} />
                                            <CardHeader>{item.nickname}</CardHeader>
                                            <CardMeta>{item.name}</CardMeta>
                                        </CardContent>
                                        <CardContent extra>
                                            <Button
                                                basic
                                                color='red'
                                                disabled={loadingRealase}
                                                onClick={() => handleRelease(item.id)}
                                            >
                                                Release
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Card.Group>
                        </Grid.Row>
                    </Segment>
                </Container>
            )}
        </div>
    )
}

export default MyCard;