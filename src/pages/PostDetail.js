import React, { useState , useEffect } from 'react'; 
import Spinner from '../components/Spinner';
import PostModel from '../models/post';
import { Redirect , Link, withRouter } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = (props) => {

    const [ loading , setLoading ] = useState(true);
    const [ redirectToPosts , setRedirectToPosts ] = useState(false);
    const [ post , setPost ] = useState({});


    useEffect (() => {
        const postId = props.match.params.id;
        PostModel.getOne(postId)
            .then((data) => {
                setPost(data.data.post);
                setLoading(false);
            })
    } , [props.match.params.id]);
    
    const deletePost = (id) => {
        PostModel.delete(id)
            .then((res) => {
                setRedirectToPosts(true);
            })
    };

    function confirmPostDelete (post) {
        const confirmDelete = window.confirm('Are you sure you want to delete your post?');
        if(confirmDelete === true) return deletePost(post);
    }
    
    function renderBtns () {
        
        if (props.user._id === post.user._id) {
            return (
                <>
                    <span
                        className="btn btn-primary"
                        onClick={() => confirmPostDelete(post._id)}
                        >Delete Post</span>
                        
                        <Link to={`/posts/${post._id}/edit`} className="btn btn-primary post-detail-edit-btn">Edit Post</Link>
                </>
            )
        }
    }


        if (redirectToPosts) {
            return <Redirect to="/posts"/>
        }

        if (!loading) {
            return (
                <div className="container">
                    <div className="post-detail-container">
                    <img src={post.image} alt="fish" className="post-detail-img img-fluid"/>
                        <section className="post-detail-info">

                            <div className="user-info">
                                <Link to={`/users/${post.user._id}`}>
                                    <img className="post-detail-user-img img-fluid" src={post.user.picture} alt={props.user.username}/>
                                </Link>
                                <Link to={`/users/${post.user._id}`}>
                                    <p className="post-detail-username">{post.user.username}</p>
                                </Link>
                            </div>
                            <h2>{post.title}</h2>
                            <h5><em>Fish Caught:</em> {post.fish}</h5>
                            <hr/>
                            <p className="post-detail-description">{post.description}</p>
                            <small>Caught at: {post.locationName}</small>
                            <div className="post-detail-buttons">
                                {renderBtns()}
                            </div>
                        </section>
                    </div>
                </div>
            )
        } else {
            return <Spinner />
        }
}

export default withRouter(PostDetail);