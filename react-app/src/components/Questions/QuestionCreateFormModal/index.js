import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import QuestionCreate from './QuestionCreate';

function QuestionCreateFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div onClick={() => setShowModal(true)}>Add Question</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div onClick={() => setShowModal(false)}><i class="fa-solid fa-x"></i></div>
            <QuestionCreate />
          </Modal>
        )}
      </>
    );
  }

  export default QuestionCreateFormModal;
