import React from 'react';

interface ResumeModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ResumeModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="image" />
      </div>
    </div>
  );
};

export default ImageModal;
