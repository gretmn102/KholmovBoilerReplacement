#!/usr/bin/env -S dotnet fsi

open System.IO

let collect root =
    let withoutRoot =
        let rootFullPath = Path.GetFullPath root
        let rootFullPathLength = rootFullPath.Length + 1
        fun (absolutePath: string) -> absolutePath[rootFullPathLength..]

    let rootInfo = DirectoryInfo root

    let isYaml ext =
        match ext with
        | ".yml" | ".yaml" -> true
        | _ -> false

    let files =
        rootInfo.GetFiles ()
        |> Array.choose (fun x ->
            if not <| isYaml x.Extension then
                None
            elif Path.GetFileNameWithoutExtension x.Name = "index" then
                None
            else
                Some (x.Name, withoutRoot x.FullName)
        )

    let dirs =
        rootInfo.GetDirectories ()
        |> Array.choose (fun dir ->
            let firstYaml =
                dir.EnumerateFiles ()
                |> Seq.tryFind (fun x ->
                    isYaml x.Extension
                )
            firstYaml
            |> Option.map (fun yaml ->
                dir.Name, withoutRoot yaml.FullName
            )
        )

    Array.append dirs files

collect "./public/boilers"
|> printfn "%A"
