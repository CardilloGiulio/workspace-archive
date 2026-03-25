using UnityEngine;

[RequireComponent(typeof(AudioSource))]
public class SpriteClickMute : MonoBehaviour
{
    [Tooltip("Assign the AudioSource you want to disable when this sprite is clicked")]
    public AudioSource audioSource;

    void Awake()
    {
        // If nothing is assigned, fall back to the one on this GameObject
        if (audioSource == null)
            audioSource = GetComponent<AudioSource>();
    }

    void OnMouseDown()
    {
        if (audioSource != null)
        {
            // Disable the AudioSource component entirely
            audioSource.enabled = false;

            // Or, if you’d rather keep it enabled but just silence it:
            // audioSource.mute = true;
        }
        else
        {
            Debug.LogWarning($"SpriteClickMute: no AudioSource assigned on {name}", this);
        }
    }
}