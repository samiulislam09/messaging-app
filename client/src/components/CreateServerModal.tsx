import { useModal } from '../hooks/useModal'
import { Button, CloseButton, Flex, Group, Image, Modal, rem, Stack, Text, TextInput } from '@mantine/core';
import { useForm} from '@mantine/form';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import React from 'react';
import classes from '../styling/ModalDropzone.module.css';
import { IconUpload, IconX, IconXboxX } from '@tabler/icons-react';

function CreateServerlModal() {
    const {isOpen, close} = useModal("CreateServer");
    const [file, setFile] = React.useState<File | null>(null);
    const form = useForm({
        initialValues: {
            name: "",
        },
        validate: {
            name: (value) => !(value.trim().length > 3)&& "Server name must be at least 3 characters long",
        },
    });
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const handleDropZoneChange: DropzoneProps['onDrop'] = (files) => {
        if(files.length === 0){
          return setImagePreview(null);
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        setFile(files[0]);
        reader.readAsDataURL(files[0]);
    };

  return (
    <Modal title="Create a server" opened={isOpen} onClose={close}>
      <Text c="dimmed" pb={rem(30)}>
        Create a server to start chatting with your friends
      </Text>
        <form onSubmit={form.onSubmit(() => {})}>
          <Stack >
            <Flex justify="center" align="center" direction="column">
              {
                !imagePreview && 
                <Dropzone className={classes.dropzone} mt="md" onDrop={(files)=>{handleDropZoneChange(files)}} accept={IMAGE_MIME_TYPE}>
                  <Group style={{minHeight: rem(100), pointerEvents:'none'}}>
                    <Dropzone.Accept>
                      <IconUpload size="3.2rem" stroke={1.5} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX size="3.2rem" stroke={1.5} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconUpload size="3.2rem" stroke={1.5} />
                    </Dropzone.Idle>
                    <Text  size="xl" style={{pointerEvents:'none'}}>
                      Drag and drop an image here
                    </Text>
                  </Group>
                </Dropzone>
              }
              {
                imagePreview && (
                  <Flex>
                    <CloseButton onClick={()=>{setImagePreview(null)}} icon={<IconXboxX size={18} stroke={1.5}/>} />
                    <Image src={imagePreview} alt="Preview" w={rem(150)} h={rem(150)} radius="lg" />
                  </Flex>
                )
              }
            </Flex>
              <TextInput label="Server name" placeholder='Enter Channel name' {...form.getInputProps('name')} error={form.errors.name}>
              </TextInput>
              <Button type="submit" variant="light" color="blue" radius="sm" fullWidth disabled={!!form.errors.name}>Create</Button>
          </Stack>
        </form>
    </Modal>
  )
}

export default CreateServerlModal;