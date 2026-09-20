import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import AcademicHero from "../../component/common/AcademicHero";
import heroImage from "../../assets/gallery/gallery9.jpeg";
import { galleryImages, GALLERY_CATEGORIES } from "./galleryData";

const C = {
  accentRed: "#E63946",
  royalBlueDark: "#261481",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const Reveal = ({ children, className = "", variants = fadeUp, ...rest }) => (
  <motion.div
    className={className}
    variants={variants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    {...rest}
  >
    {children}
  </motion.div>
);

const GalleryTile = ({ image, onOpen }) => (
  <motion.button
    variants={fadeUp}
    onClick={onOpen}
    className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer border-none p-0"
  >
    <img
      src={image.src}
      alt={image.caption}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
      <Expand size={22} className="text-white" />
      <span className="text-white text-xs font-semibold px-4 text-center leading-snug">
        {image.caption}
      </span>
    </div>
  </motion.button>
);

const Lightbox = ({ images, index, onClose, onNav }) => {
  const image = images[index];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      />

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors border-none cursor-pointer"
      >
        <X size={22} color="#fff" />
      </button>

      <button
        onClick={() => onNav(-1)}
        aria-label="Previous photo"
        className="absolute left-2 sm:left-6 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors border-none cursor-pointer"
      >
        <ChevronLeft size={24} color="#fff" />
      </button>

      <button
        onClick={() => onNav(1)}
        aria-label="Next photo"
        className="absolute right-2 sm:right-6 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors border-none cursor-pointer"
      >
        <ChevronRight size={24} color="#fff" />
      </button>

      <motion.div
        key={image.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative z-[1] max-w-4xl w-full flex flex-col items-center"
      >
        <img
          src={image.src}
          alt={image.caption}
          className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
        />
        <p className="text-white text-sm sm:text-base font-semibold mt-5 text-center">
          {image.caption}
        </p>
        <span
          className="text-[11px] font-bold uppercase tracking-wide mt-2 px-3 py-1 rounded-full"
          style={{ background: "rgba(230,57,70,.9)", color: "#fff" }}
        >
          {image.category}
        </span>
      </motion.div>
    </motion.div>
  );
};

const Gallery = () => {
  const [category, setCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(
    () =>
      category === "All"
        ? galleryImages
        : galleryImages.filter((img) => img.category === category),
    [category]
  );

  const handleNav = (dir) => {
    setLightboxIndex((prev) => (prev + dir + filtered.length) % filtered.length);
  };

  return (
    <div>
      <AcademicHero
        image={heroImage}
        title="Photo Gallery"
        subtitle="Explore life at Armed Forces Senior High Technical School through images and memories."
      />

      <section className="mx-auto px-6 lg:px-24 max-w-[1220px] py-16">
        <Reveal className="text-center max-w-[700px] mx-auto mb-12">
          <h2
            className="font-heading text-2xl sm:text-3xl font-bold mb-3"
            style={{ color: C.royalBlueDark }}
          >
            Life at Armed Forces Senior High Technical School, Kumasi
          </h2>
          <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
            Explore life at our School through images and memories.
          </p>
        </Reveal>

        <Reveal className="flex flex-wrap justify-center gap-3 mb-12">
          {GALLERY_CATEGORIES.map((c) => {
            const isActive = category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="px-5 py-2 rounded-full text-sm font-semibold border transition-colors duration-200 cursor-pointer"
                style={
                  isActive
                    ? { background: C.accentRed, borderColor: C.accentRed, color: "#fff" }
                    : { background: "#fff", borderColor: "#e5e7eb", color: "#374151" }
                }
              >
                {c}
              </button>
            );
          })}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            variants={stagger}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filtered.length ? (
              filtered.map((image, i) => (
                <GalleryTile
                  key={image.id}
                  image={image}
                  onOpen={() => setLightboxIndex(i)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 py-16">
                No photos found in this category.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNav={handleNav}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
