import {FC, ReactNode} from 'react';

interface BlogDetailsReverseProps {
    title: string;
    description: string;
    listItems: ReactNode[];
    photoClassName?: string;
}

const BlogDetailsReverse: FC<BlogDetailsReverseProps> = ({
                                                             title,
                                                             description,
                                                             listItems,
                                                             photoClassName = "blog-details-reverse-photo",
                                                         }) => {
    return (
        <div style={{margin: "200px 0"}}>
            <section className="component blog-details-reverse">
                <div className="text-blog-details-reverse">
                    <h3 style={{fontSize: "28px", marginBottom: "30px"}}>{title}</h3>
                    <p style={{margin: "30px 0"}}>{description}</p>a
                    <ul className="blog-details-list">
                        {listItems.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className={photoClassName}></div>
            </section>
        </div>
    );
};

export default BlogDetailsReverse;
