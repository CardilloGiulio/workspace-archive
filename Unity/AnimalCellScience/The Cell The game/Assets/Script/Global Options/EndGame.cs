using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
#endif

public class EndGame : MonoBehaviour
{
    void OnMouseDown()
    {
        #if UNITY_EDITOR
            EditorApplication.isPlaying = false;
        #else
            Application.Quit();
        #endif
    }
}
