import React from "react";
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { useDispatch } from "react-redux";
import { setSecretCred } from "../../store/reducers/generalSlice";

export default function SecretContractsDropdown() {
    const dispatch = useDispatch();
    const handleSelect = (contract) => {
        dispatch(setSecretCred({ contract }));
    };
    return (
        <div className="secret__dropdown">
            <Dropdown onSelect={handleSelect}>
                <DropdownToggle></DropdownToggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="secret16zcej6asqrtfq08u3fdjhs03zpl7lgy7q32eps">
                        Default contract
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="secret1t0g8tvc0tyvpwdsdc5zepa9j2ptr3vfte26qhu">
                        Alex contract
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}
