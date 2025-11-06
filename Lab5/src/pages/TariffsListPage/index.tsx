import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Tariff} from "src/modules/types.ts";
import TariffCard from "components/TariffCard";
import {TariffMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect} from "react";
import * as React from "react";
import "./styles.css"

type Props = {
    tariffs: T_Tariff[],
    setTariffs: React.Dispatch<React.SetStateAction<T_Tariff[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    tariffName: string,
    setTariffName: React.Dispatch<React.SetStateAction<string>>
}

const TariffsListPage = ({tariffs, setTariffs, isMock, setIsMock, tariffName, setTariffName}:Props) => {

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/tariffs/?tariff_name=${tariffName.toLowerCase()}`)
            const data = await response.json()
            setTariffs(data)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    const createMocks = () => {
        setIsMock(true)
        setTariffs(TariffMocks.filter(tariff => tariff.name.toLowerCase().includes(tariffName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }

    useEffect(() => {
        void fetchData()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input value={tariffName} onChange={(e) => setTariffName(e.target.value)} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {tariffs?.map(tariff => (
                    <Col key={tariff.id} xs="4">
                        <TariffCard tariff={tariff} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default TariffsListPage
