import {
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { IoMdCloseCircle } from "react-icons/io";

import { useComms } from "../../providers/comms";
import Button from "../Button";

const ErrorModal = () => {
  const { isOpen, onClose, errorInfo, handleNavigate } = useComms();

  return (
    <>
      {errorInfo && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Erro no Cadastro</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                {" "}
                <Text fontWeight="bold" as="span">
                  Mensagem:
                </Text>{" "}
                {errorInfo?.mensagem}
              </Text>
              <List>
                <ListItem>
                  <ListIcon as={IoMdCloseCircle} color="red.500" />
                  <Text fontWeight="bold" as="span">
                    ID da comunicação conflitante:
                  </Text>{" "}
                  {errorInfo.divergencia?.id_da_informacao_conflitante}
                </ListItem>
                <ListItem>
                  <ListIcon as={IoMdCloseCircle} color="red.500" />
                  <Text fontWeight="bold" as="span">
                    Causa Existente:
                  </Text>{" "}
                  {errorInfo.divergencia?.causa_existente}
                </ListItem>
                <ListItem>
                  <ListIcon as={IoMdCloseCircle} color="red.500" />
                  <Text fontWeight="bold" as="span">
                    Tentativa de cadastro:
                  </Text>{" "}
                  {errorInfo.divergencia?.tentativa_de_cadastro}
                </ListItem>
                <ListItem>
                  <ListIcon as={IoMdCloseCircle} color="red.500" />
                  <Text fontWeight="bold" as="span">
                    Distância entre as ocorrências:{" "}
                  </Text>
                  {errorInfo.divergencia?.distancia_entre_as_ocorrencias}
                </ListItem>
              </List>
            </ModalBody>

            <ModalFooter gap="15px">
              <Button onClick={onClose} bg={"blue.100"}>
                Fechar
              </Button>
              <Button
                onClick={() =>
                  handleNavigate(
                    `/verificar-conflito/${errorInfo.divergencia?.id_da_informacao_conflitante}`
                  )
                }
                // variant="ghost"
                colorScheme={"red"}
              >
                Verificar Conflito
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
export default ErrorModal;
