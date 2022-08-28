import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Button from "../Button";
import FormDetails from "./FormDetails";
import { IDetailsModal } from "./interfaces";

const DetailsModal = ({
  nome,
  cpf,
  email,
  tipo_lavoura,
  data_colheita,
  causa_da_perda,
  latitude,
  longitude,
  criado_em,
  id,
  isOpen,
  onClose,
}: IDetailsModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "md", sm: "lg" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormDetails
            nome={nome}
            cpf={cpf}
            email={email}
            tipo_lavoura={tipo_lavoura}
            data_colheita={data_colheita}
            causa_da_perda={causa_da_perda}
            latitude={latitude}
            longitude={longitude}
            criado_em={criado_em}
            id={id}
            isOpen={isOpen}
            onClose={onClose}
          />
        </ModalBody>
        {/* <ModalFooter py={1}>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
export default DetailsModal;
