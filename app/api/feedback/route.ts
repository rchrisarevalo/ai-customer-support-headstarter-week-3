import { firebase } from "@/firebase";
import {
  setDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import { NextResponse, NextRequest } from "next/server";

const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    let cur_sess_res_id = data.identifier.concat(
      "-",
      data.index_loc.toString()
    );

    const collect: CollectionReference<DocumentData, DocumentData> = collection(
      firebase,
      "feedback"
    );
    const document: DocumentReference<DocumentData, DocumentData> = doc(
      collect,
      cur_sess_res_id
    );

    if (data.rating) {
      await setDoc(document, {
        rating: data.rating,
        response: data.response,
      });
    } else {
      await deleteDoc(document);
    }

    return NextResponse.json({
      status: 200,
      message: "Feedback was successfully submitted!",
    });
  } catch {
    return NextResponse.json({
      status: 500,
      message: "Feedback failed to be submitted.",
    });
  }
};

export { POST };
