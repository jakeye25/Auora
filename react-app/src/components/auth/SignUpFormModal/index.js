import React, { useState } from 'react';
import {Modal} from "../../../context/Modal"
import SignUpForm from './SignUpForm';


function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div onClick={() => setShowModal(true)}>Sign Up with email</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div onClick={() => setShowModal(false)}><i class="fa-solid fa-x"></i></div>
            <SignUpForm />
          </Modal>
        )}
      </>
    );
  }

  export default SignupFormModal;
