import React, {Component} from 'react';
import {Modal,Button} from "react-bootstrap";

export default class AddModal extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Заголовок
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Тело
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={"primary"} onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

