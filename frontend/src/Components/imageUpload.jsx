import supabase from "../Components/supabaseClient.jsx";

async function handleImageUpload(e, id) {
  const file = e.target.files[0];

  if (!file) return;

  const fileName = `${crypto.randomUUID()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("encyclopedia_images")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    return;
  }

  const { error: dbError } = await supabase
  .from("encyclopedia_entry_images")
  .insert({
    storage_path: fileName,
    caption: "",
    display_order: 0,
    entry_id: Number(id)
  });

if (dbError) {
  console.error(dbError);
}

  console.log(data);
}

export default handleImageUpload;
