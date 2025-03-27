import {FC} from 'react';
import CustomButton from "./CustomButton";

const BlogItem: FC<{}> = ({}) => {
    return (
        <div style={{margin: "200px 0"}}>

            <section className="component blog-item" style={{justifyContent: "center"}}>

                <div className="blog-item-photo"></div>

                <div className="text-blog">
                    <h3 style={{fontSize: "25px", marginBottom: "30px"}}>Titre du blog</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                        laborum.
                    </p>
                    <CustomButton variant="contained">Lire la suite...</CustomButton>
                </div>

            </section>

        </div>
    );
};

export default BlogItem;
