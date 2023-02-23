import { message } from "antd";
import React from "react";
import styled from "styled-components";

import { useDeleteCardMutation } from "../redux/services/auth-services";

import Button from "./bits/Button";

interface ConfirmDeleteProps {
  closeModal: Function;
  delCardId: string;
  setCompleted: Function;
}

const DeleteCard = (props: ConfirmDeleteProps) => {
  const { delCardId, closeModal, setCompleted } = props;
  const [deleteCard] = useDeleteCardMutation();

  const submitDelete = async (): Promise<void> => {
    try {
      const res: any = await deleteCard(delCardId);
      if (res?.data?.status === "success") {
        message.success(res.data.message);
      } else if (res.error) {
        message.error(res.error?.data?.message);
      } else {
        message.error(res.data.message);
      }
      closeModal();
      setCompleted(true);
    } catch (error: any) {
      message.error(error?.data?.message);
      closeModal();
    }
  };

  return (
    <Wrapper>
      <div className="header">
        <h5 style={{ color: "#33277b" }}>
          <b>Warning</b>
        </h5>
      </div>
      <div>Are you sure you want to delete your card?</div>
      <div className="ft">
        <Button
          bg="white"
          color="#059157"
          border="#059157"
          fontSize="16px"
          className="me-4"
          onClick={() => closeModal()}
        >
          No
        </Button>
        <Button fontSize="16px" className="me-4" onClick={() => submitDelete()}>
          Yes
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  // width: 100%
  // height: 100%;
  color: #33277b !important;
  // // font-size: 16px;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .ft {
    margin-top: 1rem;
    margin-left: auto;
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
  }
`;

export default DeleteCard;
