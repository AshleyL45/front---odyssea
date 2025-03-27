import React, {FC} from 'react';
import '../../App.css';

export interface BlogItemBlogProps {
    title: string;
    paragraph: string;
    linkUrl: string;
    linkText: string;
}

const BlogItemBlog: FC<BlogItemBlogProps> = ({title, paragraph, linkUrl, linkText}) => {
    return (
        <div style={{margin: "100px 0"}}>
            <div className="blog-line"></div>
            <section className="component blog-item-blog">
                <div className="text-item-blog">
                    <h3 style={{fontSize: "28px", marginBottom: "30px"}}>{title}</h3>
                    <p style={{marginBottom: 50}}>{paragraph}</p>
                    <a href={linkUrl} style={{margin: "30px 0", textDecoration: "underline"}}>
                        {linkText}
                    </a>
                </div>
                <div className="blog-item-blog-photo"></div>
            </section>
            <div
                className="travel-line"
                style={{
                    width: "40%",
                    height: "3px",
                    backgroundColor: "#745E4D",
                    borderRadius: 4,
                    margin: "20px auto",
                }}
            ></div>
        </div>
    );
};

export default BlogItemBlog;
