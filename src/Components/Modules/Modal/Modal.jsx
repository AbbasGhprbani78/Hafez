import './Modal.css'

export default function Modal({
    children,
    style,
    showModal,
    setShowModal
}) {
    return (
        <div className={`modal-container ${showModal && 'showmodal'}`}>
            <div className='closemodal' onClick={() => setShowModal(false)}></div>
            <div className={`modal-contant ${style}`}>
                {children}
            </div>
        </div>
    )
}
