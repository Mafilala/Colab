'use client'
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {Button} from "../components/ui/button";
import { createNewDocument } from '../../actions/actions';
const NewDocumentButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleAddDocument = () => {
    startTransition(async() => {
      const { docId } = await createNewDocument();
      // router.push(`/doc/${docId}`);
    });
  }
  return (
    <Button
    onClick={handleAddDocument}
    disabled={isPending}
    size="lg"
    >{isPending ? "Creating...": "New Document"}</Button>
  )
}
export default NewDocumentButton