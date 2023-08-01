//CSS
import styles from './CreatePost.module.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../contexts/AuthContext'
import { useInsertDocument } from "../../hooks/useInsertDocuments";

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { insertDocument, response } = useInsertDocument("posts");

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

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
  }

  return (
    <div className={styles.createPost}>
      <h2>Criar Post</h2>
      <p>Escreva o que quiser e compartilhe o seu conhecimento!</p>
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
        {!response.loading && <button className="btn">Criar post!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  )
}

export default CreatePost