using UnityEngine;
using System.Collections.Generic;

[RequireComponent(typeof(Collider2D))]
public class AudioVolumeChanger2D : MonoBehaviour
{
    [Tooltip("All AudioSources whose volume you want to change.")]
    [SerializeField] private List<AudioSource> audioSources = new List<AudioSource>();

    [Tooltip("Volume to apply when the trigger is entered (0.0 to 1.0).")]
    [Range(0f, 1f)]
    [SerializeField] private float enterVolume = 1f;

    [Tooltip("Optional: Tag filter for the incoming Collider2D (leave blank to accept all).")]
    [SerializeField] private string triggerTag = "";

    private void Reset()
    {
        // Ensure the collider is a trigger
        var col = GetComponent<Collider2D>();
        col.isTrigger = true;
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        // If a tag is specified, only react to that tag
        if (!string.IsNullOrEmpty(triggerTag) && !other.CompareTag(triggerTag))
            return;
        // Change each AudioSource’s volume
        foreach (var src in audioSources)
        {
            if (src != null)
                src.volume = enterVolume;
        }
    }
}
