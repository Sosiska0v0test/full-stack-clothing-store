import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";

const CategoriesPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/woman" className="group">
            <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <img
                src="https://krasavica.info/uploads/posts/2022-06/1654038119_28-krasavica-info-p-milii-stil-odezhdi-devushka-krasivo-foto-28.jpg"
                alt="Woman"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-6">
                Для жінок
              </div>
            </div>
          </Link>
          <Link to="/man" className="group">
            <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <img
                src="https://i.pinimg.com/originals/19/1c/d7/191cd749fb562e5a3d9b2b4f2efa8947.png"
                alt="Man"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-6">
                Для чоловіків
              </div>
            </div>
          </Link>
          <Link to="/child" className="group">
            <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <img
                src="https://sportishka.com/uploads/posts/2022-11/1667677932_1-sportishka-com-p-detskaya-sportivnaya-odezhda-instagram-1.jpg"
                alt="Child"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-6">
                Для дітей
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
