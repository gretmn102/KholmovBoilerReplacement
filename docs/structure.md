# Структура бойлеров

```bash
touch some-boiler.yml

mkdir -p nested-boiler1
cd nested-boiler1
touch index.yml
touch some-file.jpeg
cd ..

mkdir -p nested-boiler2
cd nested-boiler2
touch index.yml
touch some-file.png
touch some.png
cd ..

touch another-boiler.yml

tree . | xclip -sel clip
```

Например, есть такая структура файлов и папок:

```
root
├── another-boiler.yml
├── boiler1.yml
├── boiler2.yml
├── nested-boiler1
│   ├── index.yml
│   └── some-file.jpeg
├── nested-boiler2
│   ├── just-index.yml
│   ├── some-file.png
│   └── some.png
└── some-boiler.yml
```

Итоговый `index.yml`:

```yml
another-boiler: another-boiler.yml
boiler1: boiler1.yml
boiler2: boiler2.yml
nested-boiler1: nested-boiler1/index.yml
nested-boiler2: nested-boiler2/just-index.yml
some-boiler: some-boiler.yml
```
