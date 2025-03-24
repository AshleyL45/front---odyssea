import {FC, ReactNode} from 'react';
import '../../App.css';

interface BlogDetailsProps {
    title: string;
    description: string;
    listItems: ReactNode[];
    // Vous pouvez ajouter d'autres props, par exemple pour personnaliser la classe de la photo.
    photoClassName?: string;
}

const BlogDetails: FC<BlogDetailsProps> = ({
                                               title,
                                               description,
                                               listItems,
                                               photoClassName = "blog-details-photo",
                                           }) => {
    return (
        <div style={{margin: "300px 0"}}>
            <section className="component blog-details">
                <div className={photoClassName}></div>
                <div className="text-blog-details">
                    <h3 style={{fontSize: "28px", marginBottom: "30px"}}>{title}</h3>
                    <p style={{margin: "30px 0"}}>{description}</p>
                    <ul className="blog-details-list">
                        {listItems.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default BlogDetails;
