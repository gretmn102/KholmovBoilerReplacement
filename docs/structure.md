# Структура бойлеров

```bash
touch boiler1.yaml
touch boiler2.yaml

touch some-boiler.yaml

mkdir -p nested-boiler1
cd nested-boiler1
touch index.yaml
touch some-file.jpeg
cd ..

mkdir -p nested-boiler2
cd nested-boiler2
touch index.yaml
touch some-file.png
touch some.png
cd ..

touch another-boiler.yaml

touch index.yaml

tree . | xclip -sel clip
```

Например, есть такая структура файлов и папок:

```
boilers
├── another-boiler.yaml
├── boiler1.yaml
├── boiler2.yaml
├── index.yaml
├── nested-boiler1
│   ├── index.yaml
│   └── some-file.jpeg
├── nested-boiler2
│   ├── index.yaml
│   ├── some-file.png
│   └── some.png
└── some-boiler.yaml
```

Итоговый `index.yaml`:

```yaml
another-boiler: another-boiler.yaml
boiler1: boiler1.yaml
boiler2: boiler2.yaml
nested-boiler1: nested-boiler1/index.yaml
nested-boiler2: nested-boiler2/index.yaml
some-boiler: some-boiler.yaml
```
