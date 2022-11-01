import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import QuestionCreate from './QuestionCreate';

function QuestionCreateFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div onClick={() => setShowModal(true)}><i class="fa-solid fa-clipboard-question"></i>&nbsp;Ask</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            <QuestionCreate setShowModal={setShowModal} />
          </Modal>
        )}
      </>
    );
  }

  export default QuestionCreateFormModal;
