import { Modal, useGeneralStore } from "../store/generalStore";

export const useModal=(modal: Modal)=>{
    const activeModal = useGeneralStore((state) => state.activeModal);
    const setActiveModal = useGeneralStore((state) => state.setActiveModal);
    const isOpen = activeModal === modal;
    const open = () => setActiveModal(modal);
    const close = () => setActiveModal(null);
    return {isOpen, open, close};
}