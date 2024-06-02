import React, { useEffect, useState } from "react";
import { Modal, Icon, Form, Segment, Grid, Image, CardContent, CardHeader, Container, GridColumn, Card, CardDescription, Divider, Header, Label, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { catchPokemon, fetchDetailCard, renamePokemon } from "../redux/detailCard/action";
import { fetchMyPokemon } from "../redux/myPokemon/action";

function DetailCard() {
    const dispatch = useDispatch();
    const { data, loading, error, successCatchPokemon, loadingCatch, successRenamePokemon } = useSelector((state) => state.detailCard);
    const MyPokemonData = useSelector((state) => state.myPokemon);
    const [nickname, setNickname] = useState("");
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchDetailCard(id));
        if (!MyPokemonData.data) {
            dispatch(fetchMyPokemon());
        }
    }, []);

    const handleCatchPokemon = () => {
        dispatch(catchPokemon(id))
    }

    const handleRenamePokemon = (e) => {
        e.preventDefault();
        const payload = {
            id,
            name: nickname
        }
        dispatch(renamePokemon(payload))
    }

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && data && data.data && (
                <Container>
                    <Segment>
                        <Grid columns={2} relaxed='very'>
                            <GridColumn>
                                <Card key={data.data.id}>
                                    <Image src={data.data.image} wrapped ui={false} />
                                    <CardContent>
                                        <CardHeader>{data.data.name}</CardHeader>
                                        <CardDescription><p>Power: {data.data.base_experience}</p></CardDescription>
                                    </CardContent>
                                    <CardContent extra>
                                        <p>Height: {data.data.height} || Weight: {data.data.weight}</p>
                                        <Button
                                            basic
                                            color={MyPokemonData.data.data.find(item => item.id === data.data.id) ? 'grey' : 'green'}
                                            disabled={loadingCatch || successCatchPokemon || MyPokemonData.data.data.find(item => item.id === data.data.id)}
                                            onClick={handleCatchPokemon}
                                        >
                                            Catch!
                                        </Button>
                                    </CardContent>
                                </Card>
                            </GridColumn>
                            <GridColumn>
                                <Header as='h2'>Information</Header>

                                <Divider section />
                                <Header as='h4'>Movement:</Header>
                                <Grid centered>
                                    {data.data.moves.map((skill) => {
                                        return (
                                            <GridColumn mobile={16} tablet={8} computer={4}>
                                                <Label>{skill.move.name}</Label>
                                            </GridColumn>
                                        )
                                    })}
                                </Grid>

                                <Divider section />
                                <Header as='h4'>Types:</Header>
                                <Grid centered>
                                    {data.data.types.map((skill) => {
                                        return (
                                            <GridColumn mobile={16} tablet={8} computer={4}>
                                                <Label>{skill.type.name}</Label>
                                            </GridColumn>
                                        )
                                    })}
                                </Grid>
                            </GridColumn>
                        </Grid>
                    </Segment>
                </Container>
            )}
            {successCatchPokemon && data.data && (
                <Modal open={successCatchPokemon} onClose={successRenamePokemon}>
                    <Modal.Header>
                        <Icon name="paw" /> Catch Pokemon
                    </Modal.Header>
                    <Modal.Content>
                        <Header as="h3">Congratulations! You caught {data.data.name}</Header>
                        <Form onSubmit={handleRenamePokemon}>
                            <Form.Field>
                                <label>Nickname:</label>
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                            </Form.Field>
                            <Button type="submit">Save</Button>
                        </Form>
                    </Modal.Content>
                </Modal>

            )}
        </div>
    )
}

export default DetailCard;