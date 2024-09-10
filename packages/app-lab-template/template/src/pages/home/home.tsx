import { useNavigate } from 'react-router-dom';
import { Button } from 'sea-lion-ui';
import { useEffect } from 'react';
import { fetchComments } from '@services/home';
import styles from './home.module.less';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let abort = () => undefined;
        const start = async () => {
            try {
                const { requestPromise, cancel } = fetchComments();
                const response = await requestPromise;
                console.log(response);
                abort = cancel;
            } catch (error) {
                console.log(error);
            }
        };

        start();
        return () => {
            abort?.();
        };
    }, []);

    return (
        <div className={styles.home}>
            <p>欢迎使用SeaLion cli</p>
            <div>
                <Button
                    btnType="link2"
                    onClick={() => navigate('/demo')}
                >
                    点击跳转至demo页
                </Button>
            </div>
        </div>
    );
};

export default Home;
