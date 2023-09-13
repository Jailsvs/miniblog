//CSS
import styles from './EditPost.module.css'

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../contexts/AuthContext'
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from '../../hooks/useFetchDocument';

const EditPost = () => {
  const {id} = useParams();
  const {document: post} = useFetchDocument("posts", id);

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      const textTags = post.tags.join(',');
      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
      return;
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    //if(formError) return;

    updateDocument(id, {
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/dashboard");
  }

  return (
    <div className={styles.editPost}>
      {post &&
      (<>
        <h2>Editando Post: {post.title}</h2>
        <p>Altere os dados do post como assim desejar!</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título</span>
            <input  type="text" 
                    name="title" 
                    required
                    placeholder="Pense em um bom título..."
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}/>
          </label>
          <label>
            <span>Url da imagem</span>
            <input  type="text" 
                    name="image" 
                    required 
                    placeholder="Insira uma imagem que represente o seu post"
                    onChange={(e) => setImage(e.target.value)}
                    value={image}/>
          </label>
          <p className={styles.previewTitle}>Preview da imagem atual:</p>
          <img className={styles.previewImage} 
              src={post.image} 
              alt={post.title} />
          <label>
            <span>Conteúdo</span>
            <textarea name="body"
                      required
                      placeholder="Insira o conteúdo do post"
                      onChange={(e) => setBody(e.target.value)}
                      value={body}>
            </textarea>
          </label>
          <label>
            <span>Tags</span>
            <input  type="text" 
                    name="tags" 
                    required 
                    placeholder="Insira as tags separadas por vírgula"
                    onChange={(e) => setTags(e.target.value)}
                    value={tags}/>
          </label>
          {!response.loading && <button className="btn">Salvar</button>}
          {response.loading && (
            <button className="btn" disabled>
              Aguarde.. .
            </button>
          )}
          {(response.error || formError) && (
            <p className="error">{response.error || formError}</p>
          )}
        </form>
      </>)}
    </div>
  )
}

export default EditPost